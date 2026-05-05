import { useEffect, useState } from "react";
import type { BookClub } from "./callApi";
import { deleteBookClub, getBookClubs, updateBookClub } from "./callApi";

export function useClubs() {
	// Usestate devolve variável clubs com o estado atual e setClubs é função do React que atualiza o estado.
	const [clubs, setClubs] = useState<BookClub[]>([]);

	useEffect(
		() => {
			// A função do callApi, vai buscar os clubs
			getBookClubs()
				// passa os clubs para setClubs
				.then(setClubs);
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
					club.id == id ? { ...club, ...updatedClub } : club,
				),
			);
		});
	}
	return { clubs, deleteClub, updateClub };
}
