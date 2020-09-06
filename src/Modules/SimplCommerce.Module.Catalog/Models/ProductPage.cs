using SimplCommerce.Infrastructure.Models;
using SimplCommerce.Module.Cms.Models;

namespace SimplCommerce.Module.Catalog.Models
{
    public class ProductPage : EntityBase
    {
        public long ProductId { get; set; }

        public Product Product { get; set; }

        public long PageId { get; set; }

        public Page Page { get; set; }

        public int DisplayOrder { get; set; }
    }
}
