using Daze.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Daze.Api.Models
{
    public class ResponseResultObject<T>
        where T : IEntity
    {
        private static string HyperlinkFormater = "http://localhost:21403/{2}?page={0}&pageSize={1}";

        public ResponseResultObject(IEnumerable<T> results, int currentPage, int pageSize, string path)
        {
            this.Results = results.ToList();
            this.TotalResults = results.Count();
            this.Links = this.GenerateHyperlinks(results, currentPage, pageSize, path);
        }

        public ResponseResultObject(IEnumerable<T> results)
        {
            this.TotalResults = results.Count();
            this.Results = results.ToList();
        }

        public IReadOnlyDictionary<string, string> Links { get; } = new Dictionary<string, string>();
        public IReadOnlyList<T> Results { get; } = new List<T>();
        public int TotalResults { get; }

        private IReadOnlyDictionary<string, string> GenerateHyperlinks(IEnumerable<T> results,
            int currentPage, int pageSize, string path)
        {
            if (currentPage == 1)
            {
                return new Dictionary<string, string>
                {
                    ["nextPage"] = String.Format(HyperlinkFormater, (currentPage + 1), (pageSize), path)
                };
            }
            else if (currentPage > 1 && TotalResults < pageSize)
            {
                return new Dictionary<string, string>
                {
                    ["prevPage"] = String.Format(HyperlinkFormater, (currentPage - 1), (pageSize), path),
                };
            }
            else if (currentPage > 1)
            {
                return new Dictionary<string, string>
                {
                    ["prevPage"] = String.Format(HyperlinkFormater, (currentPage - 1), (pageSize), path),
                    ["nextPage"] = String.Format(HyperlinkFormater, (currentPage + 1), (pageSize), path)
                };
            }
            else
            {
                return new Dictionary<string, string>();
            }
        }
    }
}
