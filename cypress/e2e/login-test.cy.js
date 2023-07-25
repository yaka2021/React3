/*global cy*/

describe("book-review", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("登録済みのメールアドレス,パスワードを入力した場合", () => {
    cy.get('[type="email"]').type("abc@example.com");
    cy.get("[type=password]").type("abc");
    cy.get("[type=button]").click();
  });

  it("メールアドレスが未入力の場合()", () => {
    cy.get("[type=password]").type("abc");
    cy.intercept(
      "POST",
      "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin"
    ).as("post_user");
    cy.get("[type=button]").click();
    cy.wait("@post_user").should((xhr) => {
      expect(xhr.response.statusCode).to.eq(400);
    });
  });

  it("無効なメールアドレスを入力した場合()", () => {
    cy.get("[type=email]").type("abcexample.com");
    cy.get("[type=password]").type("abc");
    cy.intercept(
      "POST",
      "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin"
    ).as("post_user");
    cy.get("[type=button]").click();
    cy.wait("@post_user").should((xhr) => {
      expect(xhr.response.statusCode).to.eq(403);
    });
  });

  it("パスワードが未入力の場合()", () => {
    cy.get("[type=email]").type("abc@example.com");
    cy.intercept(
      "POST",
      "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/signin"
    ).as("post_user");
    cy.get("[type=button]").click();
    cy.wait("@post_user").should((xhr) => {
      expect(xhr.response.statusCode).to.eq(400);
    });
  });
});
