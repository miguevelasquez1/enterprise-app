import * as inventory_service from './inventory.service';
// @ponicode
describe('inventory_service.InventoryService.getUserData$', () => {
  let inst: any;

  beforeEach(() => {
    inst = new inventory_service.InventoryService();
  });

  test('0', () => {
    let result: any = inst.getUserData$();
    expect(result).toMatchSnapshot();
  });
});
