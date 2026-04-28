jest.mock("../config/db", () => ({
  query: jest.fn()
}));

const db = require("../config/db");
const { getDonors } = require("../models/donorModel");

describe("donorModel.getDonors", () => {
  it("queries available donors by blood group and location", () => {
    const callback = jest.fn();

    getDonors("O+", "Salem", callback);

    expect(db.query).toHaveBeenCalledTimes(1);
    const [query, params, passedCallback] = db.query.mock.calls[0];

    expect(query).toContain("SELECT * FROM donors");
    expect(query).toContain("blood_group = ?");
    expect(query).toContain("location = ?");
    expect(query).toContain("availability = 1");
    expect(params).toEqual(["O+", "Salem"]);
    expect(passedCallback).toBe(callback);
  });
});
