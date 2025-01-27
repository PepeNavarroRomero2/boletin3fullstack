"use client";
import { useState } from "react";

export default function CreateLibros() {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [leido, setLeido] = useState(false);

    async function crearLibro(e) {
        e.preventDefault();
        try {
            const response = await fetch("/api/libros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    titulo,
                    autor,
                    leido
                }),
            });

            if (response.ok) {
                alert("Libro añadido exitosamente.");
                setTitulo("");
                setAutor("");
                setLeido(false);
            } else {
                const error = await response.json();
                alert(`Hubo un error al añadir el libro: ${error.message}`);
            }
        } catch (error) {
            console.error("Error al crear el libro:", error);
            alert("Ocurrió un error inesperado.");
        }
    }

    return (
        <div>
            <h1>Añadir un nuevo libro</h1>
            <form onSubmit={crearLibro}>
                <div>
                    <label>
                        Título:
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Autor:
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={leido}
                            onChange={(e) => setLeido(e.target.checked)}
                        />
                        ¿Leído?
                    </label>
                </div>
                <button type="submit">Añadir Libro</button>
            </form>
        </div>
    );
}
