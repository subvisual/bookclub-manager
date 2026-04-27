import { useEffect, useState } from "react";
import type { BookClub } from "./callApi";
import { deleteBookClub, getBookClubs } from "./callApi";

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

	function delClub(id: number) {
		//Função do CallApi que já faz o pedido delete com id
		deleteBookClub(id).then(() => {
			//Setclubs atualiza clubs, filtro o estado atual recebido. Mantém os clubs com id diferente
			setClubs((clubs) => clubs.filter((club) => club.id !== id));
		});
	}
	return { clubs, delClub };
}
