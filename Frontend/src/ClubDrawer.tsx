import type { BookClub } from "./callApi";
import { NewClubForm } from "./NewClubForm";

type NewBookClub = Omit<BookClub, "id">;

type ClubDrawerProps = {
	isOpen: boolean;
	saveClub: (clubForm: NewBookClub) => void;
	closeDrawer: () => void;
};

export function ClubDrawer({ isOpen, saveClub, closeDrawer }: ClubDrawerProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="drawer">
			<NewClubForm saveClub={saveClub} closeDrawer={closeDrawer} />
		</div>
	);
}
