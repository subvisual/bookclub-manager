export interface BookClub {
    id: number;
    name: string; 
    description: string;
    // Vou buscar na interface abaixo
    currentBook: Book;
    // Lista de livros no []
    upcomingBooks: Book[];
    pastBooks: Book[];
}

export interface Book {
title: string;
author: string;
}

const url = 'http://localhost:3000/clubs';



// GET por defeito
fetch(url)
.then((response) => {
    if (response.status == 200) {
       
return response.json()

    }
}
)