export const getPersonajes = async () => {
    try {
        const url = "https://my.api.mockaroo.com/comics.json?key=c917b880"; // URL de Mockaroo
        const response = await fetch(url); // Hacer la petición a la API
        const data = await response.json(); // Convertir la respuesta a JSON
        return data; // Devolver los resultados
    } catch (error) {
        console.log(`El error es: ${error}`);
    }
}