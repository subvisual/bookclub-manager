import { useEffect, useState } from "react";
import type { BookClub } from "./callApi";
import { getBookClubs, deleteBookClub } from "./callApi";


export function useClubs() {
	// Guardo os clubs no estado
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
	return clubs;

	function delClub (id:number){
		deleteBookClub(id).then()
			}
}
