import { Test, TestingModule } from '@nestjs/testing';
import { DialogFlowService } from '../botMessage/dialogFlow.service';

describe('DialogFlowService', () => {
  let dialogFlowService: DialogFlowService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [DialogFlowService],
    }).compile();
    dialogFlowService = app.get<DialogFlowService>(DialogFlowService);
  });

  describe('getDialogflowIntent', () => {
    test('should return a string', () => {
      return dialogFlowService
        .getDialogflowIntent('123456', 'I want to get a divorce')
        .then(data => {
          expect(data).toBe('Divorce');
        });
    });
  });
});
