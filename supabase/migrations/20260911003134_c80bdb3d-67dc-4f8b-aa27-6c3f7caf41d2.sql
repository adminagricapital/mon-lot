CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
REVOKE ALL ON SCHEMA private FROM anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY "Published lots are public" ON public.lots;
CREATE POLICY "Published lots are public"
ON public.lots
FOR SELECT
TO anon, authenticated
USING (is_published = true);
CREATE POLICY "Admins view all lots"
ON public.lots
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins insert lots" ON public.lots
WITH CHECK (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins update lots" ON public.lots
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins delete lots" ON public.lots
USING (private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins view reservations" ON public.reservation_requests
USING (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins update reservations" ON public.reservation_requests
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins delete reservations" ON public.reservation_requests
USING (private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Admins view contacts" ON public.contact_requests
USING (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins update contacts" ON public.contact_requests
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins delete contacts" ON public.contact_requests
USING (private.has_role(auth.uid(), 'admin'));

ALTER POLICY "Users view own profile" ON public.profiles
USING (id = auth.uid() OR private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Admins delete profiles" ON public.profiles
USING (private.has_role(auth.uid(), 'admin'));
ALTER POLICY "Users view own role" ON public.user_roles
USING (user_id = auth.uid() OR private.has_role(auth.uid(), 'admin'));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM service_role;
DROP FUNCTION public.has_role(uuid, public.app_role);