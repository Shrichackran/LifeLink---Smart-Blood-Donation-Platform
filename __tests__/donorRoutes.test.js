const request = require("supertest");

jest.mock("../models/donorModel", () => ({
  getDonors: jest.fn()
}));

const donorModel = require("../models/donorModel");
const app = require("../app");

describe("GET /donors", () => {
  beforeEach(() => {
    donorModel.getDonors.mockReset();
  });

  it("returns 400 when required query parameters are missing", async () => {
    const response = await request(app).get("/donors").query({ bloodGroup: "O+" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing parameters" });
    expect(donorModel.getDonors).not.toHaveBeenCalled();
  });

  it("returns matching donors when query parameters are provided", async () => {
    const donors = [{ id: 1, name: "Sam", blood_group: "O+", location: "Salem" }];

    donorModel.getDonors.mockImplementation((bloodGroup, location, callback) => {
      callback(null, donors);
    });

    const response = await request(app)
      .get("/donors")
      .query({ bloodGroup: "O+", location: "Salem" });

    expect(donorModel.getDonors).toHaveBeenCalledWith("O+", "Salem", expect.any(Function));
    expect(response.status).toBe(200);
    expect(response.body).toEqual(donors);
  });

  it("returns 500 when the donor lookup fails", async () => {
    const error = { message: "DB error" };

    donorModel.getDonors.mockImplementation((bloodGroup, location, callback) => {
      callback(error);
    });

    const response = await request(app)
      .get("/donors")
      .query({ bloodGroup: "A+", location: "Chennai" });

    expect(donorModel.getDonors).toHaveBeenCalledWith("A+", "Chennai", expect.any(Function));
    expect(response.status).toBe(500);
    expect(response.body).toEqual(error);
  });
});
