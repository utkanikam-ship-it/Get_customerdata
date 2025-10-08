sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, ODataModel, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("com.sap.projectbtp.controller.View1", {

        onInit: function () {
            // Create JSONModel for table
            this.getView().setModel(new JSONModel({ customerData: [] }));
        },

        onGetCustomerPress: function () {
            var sCustomerId = this.byId("inputCustomerId").getValue().trim();
            if (!sCustomerId) {
                MessageToast.show("Please enter a Customer ID");
                return;
            }

            var that = this;

            // Create ODataModel pointing to proxy
            var oODataModel = new ODataModel("/V3/Northwind/Northwind.svc/", {
                json: true,
                useBatch: false
            });

            oODataModel.read("/Customers('" + sCustomerId + "')", {
                success: function (oData) {
                    // Wrap in array for table binding
                    that.getView().getModel().setProperty("/customerData", [oData]);
                },
                error: function () {
                    MessageToast.show("Customer not found");
                    that.getView().getModel().setProperty("/customerData", []);
                }
            });
        }

    });
});
