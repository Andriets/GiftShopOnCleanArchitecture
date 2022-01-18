using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exeptions
{
    [Serializable]
    public class GiftShopException : Exception
    {
        public GiftShopException()
        {
        }

        public GiftShopException(string message)
            : base(message)
        {
        }

        public GiftShopException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
