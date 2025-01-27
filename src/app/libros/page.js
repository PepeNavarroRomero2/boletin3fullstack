"use client";
import { useState, useEffect } from "react";

export default function ListLibros() {
    const [libros, setLibros] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    async function fetchLibros() {
        try {
            const response = await fetch("/api/libros");
            if (!response.ok) {
                throw new Error("Error al cargar los libros");
            }
            const body = await response.json();
            setLibros(body);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchLibros();
    }, []);

    function handleCheckboxChange(id) {
        setLibros(prevLibros =>
            prevLibros.map(libro =>
                libro.id === id ? { ...libro, leido: !libro.leido } : libro
            )
        );
    }

    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }


    const librosFiltrados = libros.filter(libro => {
        if (filtro === "leidos") return libro.leido;
        if (filtro === "noLeidos") return !libro.leido;
        return true;
    });

    return (
        <div>
            <h1>Lista de Libros</h1>

            <div>
                <label>Filtrar por:</label>
                <select value={filtro} onChange={handleFiltroChange}>
                    <option value="todos">Todos</option>
                    <option value="leidos">Leídos</option>
                    <option value="noLeidos">No leídos</option>
                </select>
            </div>

            {librosFiltrados.map(libro => (
                <div key={libro.id}>
                    <p><strong>Título:</strong> {libro.titulo}</p>
                    <p><strong>Autor:</strong> {libro.autor}</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={libro.leido}
                            onChange={() => handleCheckboxChange(libro.id)}
                        />
                        Leído
                    </label>
                </div>
            ))}
        </div>
    );
}
