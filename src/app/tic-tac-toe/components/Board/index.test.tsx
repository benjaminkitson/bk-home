import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from ".";
import React from "react";
import { AppContext, AppContextType } from "../AppContext";
import { RxCross1 } from "react-icons/rx";

describe("Board", () => {

    // Not sure these really belong here, probably should be with the square component
    it("populates a square when the board data is passed in", () => {

        const mockBoardData = {
            board: [
                [undefined, undefined, undefined],
                ["X", undefined, undefined],
                [undefined, undefined, undefined],
            ]
        } as unknown as AppContextType

        render(
            <AppContext.Provider value={mockBoardData}>
                <Board />
            </AppContext.Provider>
    );

        const xSquare = screen.getByTestId("1-0");

        expect(xSquare.firstChild).not.toBeNull()
    });

    it("leaves other squares empty when a single one is populated", () => {

        const mockBoardData = {
            board: [
                [undefined, undefined, undefined],
                ["X", undefined, undefined],
                [undefined, undefined, undefined],
            ]
        } as unknown as AppContextType

        render(
            <AppContext.Provider value={mockBoardData}>
                <Board />
            </AppContext.Provider>
        );

        const xSquare = screen.getByTestId("2-0");

        expect(xSquare.firstChild).toBeNull()
    });
});
