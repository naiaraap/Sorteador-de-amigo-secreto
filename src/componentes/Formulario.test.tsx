import { act, fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

describe("o comportamento do Formulário.tsx", () => {
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira o nome das participantes"
    );
    const botao = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira o nome das participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira o nome das participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");
    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("A mensagem de texto deve sumir após cinco segundos", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    jest.useFakeTimers();

    const input = screen.getByPlaceholderText(
      "Insira o nome das participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);
    fireEvent.change(input, { target: { value: "Ana Catarina" } });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBe(null);
  });
});

