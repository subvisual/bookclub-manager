import {render, screen, fireEvent} from "@testing-library/react"
import {DeleteButton} from "./DeleteButton";
import {expect, vi} from "vitest";


it("Calls deleteClub with the correct id", () =>{

// Arrange

//Crio o mock
// O vitest, através do vi.fn(), cria a function mock
const deleteClubMock = vi.fn();

//Renderiza o button mas usa a função mock em vez da deleteClub, pois apagaria de facto o club
render (
    <DeleteButton
    id={1}
    // Passo o mock como prop
    deleteClub={deleteClubMock}
    />
)

//Act

//Simula o evento - click do util
fireEvent.click(
// Localiza o button pelo role e pelo nome que o utilizador vê
screen.getByRole("button", {name: "DELETE CLUB"})
);


//Assert

//Verifica se o mock foi chamado com o id
expect(deleteClubMock).toHaveBeenCalledWith(1)
});