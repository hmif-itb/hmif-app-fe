/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { AuthService } from './services/AuthService';
import { CalendarService } from './services/CalendarService';
import { CategoryService } from './services/CategoryService';
import { CommentService } from './services/CommentService';
import { CourseService } from './services/CourseService';
import { InfoService } from './services/InfoService';
import { MediaService } from './services/MediaService';
import { OpenGraphService } from './services/OpenGraphService';
import { PushService } from './services/PushService';
import { ReactionService } from './services/ReactionService';
import { TestimoniService } from './services/TestimoniService';
import { UnsubscribeService } from './services/UnsubscribeService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class ApiClient {
  public readonly auth: AuthService;
  public readonly calendar: CalendarService;
  public readonly category: CategoryService;
  public readonly comment: CommentService;
  public readonly course: CourseService;
  public readonly info: InfoService;
  public readonly media: MediaService;
  public readonly openGraph: OpenGraphService;
  public readonly push: PushService;
  public readonly reaction: ReactionService;
  public readonly testimoni: TestimoniService;
  public readonly unsubscribe: UnsubscribeService;
  public readonly request: BaseHttpRequest;
  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '0.0.1',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.auth = new AuthService(this.request);
    this.calendar = new CalendarService(this.request);
    this.category = new CategoryService(this.request);
    this.comment = new CommentService(this.request);
    this.course = new CourseService(this.request);
    this.info = new InfoService(this.request);
    this.media = new MediaService(this.request);
    this.openGraph = new OpenGraphService(this.request);
    this.push = new PushService(this.request);
    this.reaction = new ReactionService(this.request);
    this.testimoni = new TestimoniService(this.request);
    this.unsubscribe = new UnsubscribeService(this.request);
  }
}

