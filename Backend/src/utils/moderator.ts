import { ContentModeratorClient } from "@azure/cognitiveservices-contentmoderator";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import HttpError from "../models/http-error";

const contentModerator = async (word: string | string[]): Promise<number> => {
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    process.env.CONTENT_MODERATOR_KEY as string
  );
  const client = new ContentModeratorClient(
    cognitiveServiceCredentials,
    process.env.CONTENT_MODERATOR_ENDPOINT as string
  );

  let response = 0;

  if (Array.isArray(word)) {
    const promises = word.map(async (w) => {
      const cleanWord = w
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, "")
        .toLowerCase()
        .replace(/\./g, "")
        .trim();

      try {
        const result = await client.textModeration.screenText(
          "text/html",
          cleanWord
        );
        if (result.terms && result.terms.length > 0) {
          return -1; // Found inappropriate content
        }
      } catch (err) {
        console.error("An error occurred during content moderation:", err);
        throw new HttpError("Content moderation service failed", 500);
      }
      return 0;
    });

    const results = await Promise.all(promises);
    if (results.includes(-1)) {
      response = -1; // At least one word found inappropriate content
    }
  } else {
    const cleanWord = word
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&nbsp;/g, "")
      .toLowerCase()
      .replace(/\./g, "")
      .trim();

    try {
      const result = await client.textModeration.screenText(
        "text/html",
        cleanWord
      );
      if (result.terms && result.terms.length > 0) {
        response = -1; // Found inappropriate content
      }
    } catch (err) {
      console.error("An error occurred during content moderation:", err);
      throw new HttpError("Content moderation service failed", 500);
    }
  }

  return response;
};

export default contentModerator;
