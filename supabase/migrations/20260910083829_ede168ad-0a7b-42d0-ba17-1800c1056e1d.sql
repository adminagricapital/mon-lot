CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.lot_status AS ENUM ('disponible', 'reserve', 'vendu');
CREATE TYPE public.request_status AS ENUM ('nouvelle', 'contactee', 'traitee', 'archivee');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

CREATE TABLE public.lots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE CHECK (char_length(reference) BETWEEN 2 AND 50),
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 120),
  city text NOT NULL CHECK (char_length(city) BETWEEN 2 AND 100),
  area_name text NOT NULL CHECK (char_length(area_name) BETWEEN 2 AND 160),
  region text CHECK (region IS NULL OR char_length(region) <= 120),
  area_sqm integer NOT NULL CHECK (area_sqm > 0),
  cash_price bigint NOT NULL CHECK (cash_price > 0),
  status public.lot_status NOT NULL DEFAULT 'disponible',
  cover_image_url text NOT NULL CHECK (char_length(cover_image_url) BETWEEN 5 AND 2000),
  gallery_urls text[] NOT NULL DEFAULT '{}',
  description text NOT NULL CHECK (char_length(description) BETWEEN 10 AND 3000),
  access_details text CHECK (access_details IS NULL OR char_length(access_details) <= 1000),
  documents text[] NOT NULL DEFAULT '{}',
  latitude double precision,
  longitude double precision,
  is_featured boolean NOT NULL DEFAULT false,
  featured_priority integer CHECK (featured_priority IS NULL OR featured_priority > 0),
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_coordinates CHECK ((latitude IS NULL AND longitude IS NULL) OR (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180))
);
GRANT SELECT ON public.lots TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.lots TO authenticated;
GRANT ALL ON public.lots TO service_role;
ALTER TABLE public.lots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published lots are public" ON public.lots FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert lots" ON public.lots FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update lots" ON public.lots FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete lots" ON public.lots FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.reservation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lot_id uuid NOT NULL REFERENCES public.lots(id) ON DELETE RESTRICT,
  lot_reference text NOT NULL,
  lot_title text NOT NULL,
  duration_months integer NOT NULL CHECK (duration_months IN (0, 3, 6, 9, 12)),
  total_price bigint NOT NULL CHECK (total_price > 0),
  reservation_amount bigint NOT NULL CHECK (reservation_amount >= 0),
  monthly_amount bigint NOT NULL CHECK (monthly_amount >= 0),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 30),
  email text CHECK (email IS NULL OR char_length(email) <= 254),
  message text CHECK (message IS NULL OR char_length(message) <= 1500),
  status public.request_status NOT NULL DEFAULT 'nouvelle',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.reservation_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.reservation_requests TO authenticated;
GRANT ALL ON public.reservation_requests TO service_role;
ALTER TABLE public.reservation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit reservations" ON public.reservation_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'nouvelle');
CREATE POLICY "Admins view reservations" ON public.reservation_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update reservations" ON public.reservation_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete reservations" ON public.reservation_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 30),
  email text CHECK (email IS NULL OR char_length(email) <= 254),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 2 AND 160),
  message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 1500),
  status public.request_status NOT NULL DEFAULT 'nouvelle',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors submit contacts" ON public.contact_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'nouvelle');
CREATE POLICY "Admins view contacts" ON public.contact_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update contacts" ON public.contact_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete contacts" ON public.contact_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "Admins delete profiles" ON public.profiles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users view own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER lots_updated_at BEFORE UPDATE ON public.lots FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER reservations_updated_at BEFORE UPDATE ON public.reservation_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER contacts_updated_at BEFORE UPDATE ON public.contact_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX lots_public_order_idx ON public.lots (is_published, status, is_featured, featured_priority, published_at DESC);
CREATE INDEX reservation_created_idx ON public.reservation_requests (created_at DESC);
CREATE INDEX contact_created_idx ON public.contact_requests (created_at DESC);