using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exeptions
{
    [Serializable]
    public class GiftShopExeption : Exception
    {
        public GiftShopExeption()
        {
        }

        public GiftShopExeption(string message)
            : base(message)
        {
        }

        public GiftShopExeption(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
