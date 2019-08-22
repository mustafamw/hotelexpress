import { UserManagementService } from '../../../services/user-management/user-management';

describe("User Management Service", function() {

    let userManagementService;

    beforeAll(() => {
        userManagementService = new UserManagementService();
    });

    it("should call userManagementService.insert", (done) => {
        spyOn(userManagementService, 'insert');
        expect(userManagementService.insert).not.toHaveBeenCalled();
        userManagementService.insert();
        expect(userManagementService.insert).toHaveBeenCalled();
        expect(userManagementService.insert.calls.count()).toBe(1);
        done();
    });

    it("should call userManagementService.insert with correct data", (done) => {
        const userManagement = userManagementService.UserManagement();
        const data = {
            email: "test@test.com",
            givenName: "tom",
            familyName: "dave"
        };
        spyOn(userManagement, 'save');
        spyOn(userManagementService, 'insert').and.callThrough();
        userManagementService.insert(data)
        .then((data) => {
            console.log(data);
        });
        expect(userManagement.save).not.toHaveBeenCalled();
        done();
    });
});