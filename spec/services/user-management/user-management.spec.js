const UserManagement = require('../../../services/user-management/user-management').UserManagement;

describe("User Management Service", function() {

    let userManagement = new UserManagement('user');

    it("should call userManagement.insert", (done) => {
        spyOn(userManagement, 'insert');
        expect(userManagement.insert).not.toHaveBeenCalled();
        userManagement.insert();
        expect(userManagement.insert).toHaveBeenCalled();
        expect(userManagement.insert.calls.count()).toBe(1);
        done();
    });
});