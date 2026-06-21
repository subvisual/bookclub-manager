type ButtonProps = {
	// DeleteCLub recebe o id do club a apagar e a função deleteClub passado via props
	id: number;

	deleteClub: (id: number) => void;
};

export function DeleteButton({ id, deleteClub }: ButtonProps) {
	return (
		<button className="buttonDel" type="button" onClick={() => deleteClub(id)}>
			DELETE CLUB
		</button>
	);
}
