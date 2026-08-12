import { useEffect, useState } from "react";
import type { BookClub } from "./callApi";
import {
	createBookClub,
	deleteBookClub,
	getBookClubs,
	updateBookClub,
} from "./callApi";

type NewBookClub = Omit<BookClub, "id">;

export function useClubs() {
	// Usestate devolve variável clubs com o estado atual e setClubs é função do React que atualiza o estado.
	const [clubs, setClubs] = useState<BookClub[]>([]);
	// True, uma vez que quando a pagina carrega já estou a pedir dados
	const [loading, setLoading] = useState<boolean>(true);
	// Mensagem de erro ou null(não há erro).
	const [error, setError] = useState<string | null>(null);

	useEffect(
		() => {
			setLoading(true);
			// A função do callApi, vai buscar os clubs
			getBookClubs()
				// passa os clubs para setClubs
				.then((clubsData) => {
					setClubs(clubsData);
					setLoading(false);
				})
				.catch((err) => {
					setError(err);
					setLoading(false);
				});
		},
		// Para só executar uma vez
		[],
	);

	function deleteClub(id: number) {
		//Função do CallApi que já faz o pedido delete com id
		deleteBookClub(id).then(() => {
			//Setclubs atualiza clubs, filtro o estado atual recebido. Mantém os clubs com id diferente
			setClubs((clubs) => clubs.filter((club) => club.id !== id));
		});
	}

	function updateClub(id: number, updatedClub: Partial<BookClub>) {
		// Do callApi.ts
		updateBookClub(id, updatedClub).then(() => {
			// Atualizo clubs, percorro o array com map, se o id é igual, substitui com dados atualizados, se não mantém os dados.
			setClubs((clubs) =>
				clubs.map((club) =>
					club.id === id ? { ...club, ...updatedClub } : club,
				),
			);
		});
	}

	function createClub(newClub: NewBookClub) {
		// O then recebe a promise --- BookClub -- em createdClub
		createBookClub(newClub).then((createdClub) => {
			//Atualizo clubs, cria novo array com clubs + novo club
			setClubs((clubs) => [...clubs, createdClub]);
		});
	}

	// Novo estado. Vai receber number(id) ou null. Inicio em null, mostrando a lista de clubs
	const [selectedClub, setSelectedClub] = useState<number | null>(null);
	// Mostro o club quando selecionado o id
	function showClub(id: number) {
		setSelectedClub(id);
	}

	function backToList() {
		setSelectedClub(null);
	}

	return {
		clubs,
		deleteClub,
		updateClub,
		createClub,
		selectedClub,
		showClub,
		backToList,
		loading,
		error,
	};
}
