type ButtonProps = {
	id: number;
	showClub: (id: number) => void;
};

export function DetailsButton({ id, showClub }: ButtonProps) {
	return (
		<button type="button" onClick={() => showClub(id)}>
			VIEW DETAILS
		</button>
	);
}
