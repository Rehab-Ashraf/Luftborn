using Framework.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Framework.Core.Models
{
    public class GenericResultTotal<TCollection, Statistics>
	{
		#region Properties
		public TCollection Collection { get; set; }
		public Pagination Pagination { get; set; }
		public Statistics StatisticsData { get; set; }
		#endregion
	}
}
