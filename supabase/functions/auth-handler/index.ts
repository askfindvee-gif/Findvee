import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { action, email, password, userData } = await req.json()

    if (action === 'signup') {
      const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Insert user data into custom users table
        const { error: insertError } = await supabaseClient
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email,
            display_name: userData?.displayName || email.split('@')[0],
            avatar_url: userData?.avatarUrl,
            signup_method: 'email'
          })

        if (insertError) console.error('Error inserting user:', insertError)
      }

      return new Response(
        JSON.stringify({ user: authData.user, session: authData.session }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'signin') {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Update last login
      if (data.user) {
        await supabaseClient
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id)
      }

      return new Response(
        JSON.stringify({ user: data.user, session: data.session }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'google-signin') {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${req.headers.get('origin') || 'http://localhost:5173'}/?auth=callback`
        }
      })

      if (error) throw error

      return new Response(
        JSON.stringify({ url: data.url }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'signout') {
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})