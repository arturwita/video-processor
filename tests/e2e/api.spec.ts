import axios from "axios";
import {
  ProcessVideoBodyDto,
  ProcessVideoResponseDto,
  GetVideoByIdResponseDto,
} from "../../src/gateway/dto";
import { RabbitListener } from "../helpers/rabbit-listener";
import { VideoId } from "../../src/shared/types/video";
import { sleep } from "../helpers/sleep";
import { GetVideoByIdEventPayload } from "../../src/domain/events";

describe("Video Processor API", () => {
  const rabbitListener = new RabbitListener();
  const testRabbitConfig = {
    url: "amqp://rabbit:example@localhost:5672",
    queue: "video-processor-test-queue",
    exchange: "video-exchange",
  };

  const processVideoBodyDto: ProcessVideoBodyDto = {
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  };

  beforeAll(async () => {
    const { url, exchange, queue } = testRabbitConfig;
    await rabbitListener.connect(url, exchange, queue);

    const topics = [
      "video.processing.request",
      "analyze.video",
      "video.analyzed",
      "process.video",
      "video.processed",
    ];
    await rabbitListener.bindTopics(topics);
  });

  afterAll(async () => {
    await rabbitListener.close();
  });

  describe.skip("POST /videos/process", () => {
    const url = "http://localhost:3000/videos/process";

    it("should emit all necessary events", async () => {
      const response = await axios.post<ProcessVideoResponseDto>(
        url,
        processVideoBodyDto
      );

      // const rabbit = await rabbitListener.listen();
      // const rabbit = await rabbitListener.listen("video.processing.request");
      // const rabbit2 = await rabbitListener.listen("analyze.video");
      // const rabbit3 = await rabbitListener.listen("analyze-video");
      // const rabbit4 = await rabbitListener.listen("analyze-video");
      // const rabbit5 = await rabbitListener.listen("analyze-video");
      // console.log({ rabbit, rabbit2 });
      // console.log({ rabbit });
      // todo: listen to "video-processing-request"
      // todo: listen to "analyze-video"
      // todo: listen to "video-analyzed"
      // todo: listen to "process-video"
      // todo: listen to "video-processed"

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty("videoId");
    });
  });

  describe("GET /videos/:id", () => {
    let videoId: VideoId;
    const processingUrl = "http://localhost:3000/videos/process";

    beforeAll(async () => {
      const topics = ["get.video.by.id"];
      await rabbitListener.bindTopics(topics);
    });

    beforeEach(async () => {
      const response = await axios.post<ProcessVideoResponseDto>(
        processingUrl,
        processVideoBodyDto
      );
      videoId = response.data.videoId;
      await sleep(2000);
    });

    it("should return a processed video", async () => {
      const url = `http://localhost:3000/videos/${videoId}`;

      const response = await axios.get<GetVideoByIdResponseDto>(url);
      const event = await rabbitListener.listen<GetVideoByIdEventPayload>();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        _id: videoId,
        url: processVideoBodyDto.url,
        status: "processed",
        meta: {
          height: 720,
          width: 1280,
          codec: "h264",
          avgFramerate: "24/1",
          rFramerate: "24/1",
          colorSpace: "unknown",
          colorPrimaries: "unknown",
        },
        __v: 0,
      });
      expect(event.msg).toEqual({
        videoId,
      });
      expect(event.topic).toBe("get.video.by.id");
    });
  });
});
