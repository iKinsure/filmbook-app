
const check = res => {
    if (!res.ok) {
        console.log(res);
        throw new Error(res.statusText + ' ' + res.status);
    }
    return res;
}

export const getImage = id => {
    return 'api/images/' + id;
}

export const getFilms = () => {
    return fetch('api/films').then(check);
}

export const getFilmById = id => {
    return fetch(`api/films/${id}`).then(check);
}

export const updateFilm = (id, film) => {
    return fetch(`api/films/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(film),
    }).then(check);
}

export const createFilm = film => {
    return fetch('api/films', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(film),
    }).then(check);
}

export const deleteFilm = id => {
    return fetch(`api/films/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    }).then(check);
}

export const uploadImage = file => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch('/api/images', {
        method: 'POST',
        body: formData,
    }).then(check);
}
