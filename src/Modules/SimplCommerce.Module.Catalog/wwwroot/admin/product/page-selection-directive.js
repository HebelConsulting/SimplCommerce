/*global angular confirm*/
(function () {
    angular
        .module('simplAdmin.catalog')
        .directive('pageSelectionDirective', pageSelectionDirective);

    function pageSelectionDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: '_content/SimplCommerce.Module.Catalog/admin/product/page-selection-directive.html',
            scope: {
                selectedPages: '=selectedPages',
                modelId: '@modelId',
                title: '@title',
                isVisibleIndividually: '@isVisibleIndividually'
            },
            controller: ['productService', PageSelectionCtrl],
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    /* @ngInject */
    function PageSelectionCtrl(productService) {
        var vm = this,
            tableStateRef;
        vm.pages = [];

        vm.getPages = function getPages(tableState) {
            tableStateRef = tableState;
            tableStateRef.search = tableStateRef.search || {};
            tableStateRef.search.predicateObject = tableStateRef.search.predicateObject || {};
            tableStateRef.search.predicateObject.IsVisibleIndividually = vm.isVisibleIndividually;
            tableStateRef.search.predicateObject.IsPublished = "true";
            vm.isLoading = true;
            productService.getPages(tableState).then(function (result) {
                vm.pages = result.data.items;
                tableState.pagination.numberOfPages = result.data.numberOfPages;
                vm.isLoading = false;
            });
        };

        vm.checkSelected = function checkSelected(page) {
            var selected = vm.selectedPages?.find(function (item) { return item.id === page.id; });

            if (selected) {
                return true;
            }

            return false;
        };

        vm.toggleSelectedPages = function toggleSelectedPages(page) {
            var selectedPageIds, index;
            selectedPageIds = vm.selectedPages.map(function (item) { return item.id; });
            index = selectedPageIds.indexOf(page.id);
            if (index > -1) {
                vm.selectedPages.splice(index, 1);
            } else {
                vm.selectedPages.push({ id: page.id, name: page.name, isPublished: page.isPublished });
            }
        };
    }
})();
