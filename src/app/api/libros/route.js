import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjcwjhszfnocrkvwumnh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3dqaHN6Zm5vY3Jrdnd1bW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODgxNTksImV4cCI6MjA1Mjk2NDE1OX0.Ob2eeJk5wlO8tUjmkvx9N6aB1cIPcsuKiJoMa2Jwuk8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){

    const{data: libros, error} = await supabase
    .from('libros')
    .select('*')
    
    return new Response(JSON.stringify(libros), {status:200})
}

export async function DELETE(request){
    const body = await request.json()
    const id = body.id
    
    const {data: deleteData, error} = await supabase.from("libros").delete().eq("id", id)
    
    if(error){
        return new Response(JSON.stringify(error), {status:404})
    }
    
    return new Response(JSON.stringify({success: "eliminado con éxito"}), {status:200})
}

export async function POST(request) {
    const body = await request.json();
    const { titulo, autor, leido } = body;
    
    const { data: postData, error } = await supabase
        .from("libros")
        .insert({ titulo, autor, leido });

    if (!error) {
        return new Response(JSON.stringify({ success: "Creado con éxito" }), { status: 201 });
    }

    return new Response(JSON.stringify(error), { status: 400 });
}