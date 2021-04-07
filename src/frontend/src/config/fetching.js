
const check = res => {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
}

export const getFilms = async () => {
    return await fetch('api/films').then(check);
}

export const getFilmById = async (id) => {
    return await fetch(`api/films/${id}`).then(check);
}

export const updateFilm = async (id, film) => {
    return await fetch(`api/films/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(film),
    }).then(check);
}

export const createFilm = async (film) => {
    return await fetch('api/films', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(film),
    }).then(check);
}

export const deleteFilm = async (id) => {
    return await fetch(`api/films/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    }).then(check);
}

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await fetch('/api/images', {
        method: 'POST',
        body: formData,
    }).then(check);
}
