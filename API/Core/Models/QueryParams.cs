using API.Extension;

namespace API.Core.Models
{
    public class QueryParams
    {
        public string Month { get; set; }
        public string Year { get; set; }
        public bool IsSortAscending { get; set; }
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string SearchString { get; set; }
    }
}