import { useState } from "react";
import type { BookClub } from "./callApi";

type NewBookClub = Omit<BookClub, "id">;

type NewClubFormProps = {
	saveClub: (clubForm: NewBookClub) => void;
	closeDrawer: () => void;
};

export function NewClubForm({ saveClub, closeDrawer }: NewClubFormProps) {
	const [clubForm, setClubForm] = useState<NewBookClub>({
		name: "",
		description: "",
		currentBook: {
			title: "",
			author: "",
		},
		upcomingBooks: [],
		pastBooks: [],
		meetings: [],
	});
	return (
		<div className="new-club-form">
			<h3>NEW CLUB</h3>
			<hr />
			<p>NAME</p>
			<input
				value={clubForm.name}
				onChange={(e) =>
					setClubForm({
						...clubForm,
						name: e.target.value,
					})
				}
			/>
			<p>DESCRIPTION</p>
			<input
				value={clubForm.description}
				onChange={(e) =>
					setClubForm({
						...clubForm,
						description: e.target.value,
					})
				}
			/>
			<p>CURRENT BOOK:</p>
			<p>TITLE</p>
			<input
				value={clubForm.currentBook.title}
				onChange={(e) =>
					setClubForm({
						...clubForm,
						currentBook: {
							...clubForm.currentBook,
							title: e.target.value,
						},
					})
				}
			/>
			<p>AUTHOR</p>
			<input
				value={clubForm.currentBook.author}
				onChange={(e) =>
					setClubForm({
						...clubForm,
						currentBook: {
							...clubForm.currentBook,
							author: e.target.value,
						},
					})
				}
			/>
			<button
				type="button"
				onClick={() => {
					saveClub(clubForm);
					closeDrawer();
				}}
			>
				SAVE CLUB
			</button>
		</div>
	);
}
