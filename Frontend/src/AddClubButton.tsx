type AddClubButtonProps = {
	openAddClubDrawer: () => void;
};

export function AddClubButton({ openAddClubDrawer }: AddClubButtonProps) {
	return (
		<button className={"buttonDark"} type="button" onClick={openAddClubDrawer}>
			+ NEW CLUB
		</button>
	);
}
