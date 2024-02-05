import { redirect, fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return fail(422, { error: error.message, succes: false})
    }
    throw redirect(302, "/profile");
     
    return {
      message: 'Un Email vous a normalement été envoyé afin de vous connecter',
      success: true,
    }
  },
}