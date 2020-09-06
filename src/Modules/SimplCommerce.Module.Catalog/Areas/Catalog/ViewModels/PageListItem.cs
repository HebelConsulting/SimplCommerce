using System;
namespace SimplCommerce.Module.Catalog.Areas.Catalog.ViewModels
{
    public class PageListItem
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public DateTimeOffset CreatedOn { get; set; }

        public bool IsPublished { get; set; }

        public string Slug { get; set; }
    }
}
