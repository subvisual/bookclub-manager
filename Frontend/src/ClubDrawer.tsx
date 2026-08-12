import type { BookClub } from "./callApi";
import { NewClubForm } from "./NewClubForm";

type NewBookClub = Omit<BookClub, "id">;

type ClubDrawerProps = {
	isOpen: boolean;
	saveClub: (clubForm: NewBookClub) => void;
	closeDrawer: () => void;
	clubToEdit: BookClub | null;
};

export function ClubDrawer({
	isOpen,
	saveClub,
	closeDrawer,
	clubToEdit,
}: ClubDrawerProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="drawer">
			<NewClubForm
				saveClub={saveClub}
				closeDrawer={closeDrawer}
				clubToEdit={clubToEdit}
			/>
		</div>
	);
}
