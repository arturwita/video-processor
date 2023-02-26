import { generateVideoId } from "../../src/shared/utils/generate-video-id";

describe("generate video id", () => {
  it("should return a valid UUID v4 string", () => {
    const uuidV4Regex =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    const id = generateVideoId();

    expect(typeof id).toBe("string");
    expect(id).toMatch(uuidV4Regex);
  });
});
