import { error, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    return { "error": "session have not been loaded"}
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, full_name, avatar_url`)
    .eq('id', session.user.id)
    .single()

  return { session, profile }
}
