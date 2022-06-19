using Application.Carts.Commands.AddBoxToCart;
using NUnit.Framework;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using Application.Carts.Commands.ClearUserCart;
using Domain.Exeptions;
using Application.Carts.Commands.DeleteBoxFromCart;

namespace UnitTests.Carts
{
    [TestFixture]
    internal class CartCommandsTests : TestInitializer
    {
        private AddBoxToCartCommandHandler _addBoxToCartCommandHandler;
        private ClearUserCartCommandHandler _clearUserCartCommandHandler;
        private DeleteBoxFromCartCommandHandler _deleteBoxFromCartCommandHandler;
        private Cart _cart;

        [SetUp]
        protected override void Initialize()
        {
            base.Initialize();
            _addBoxToCartCommandHandler = new AddBoxToCartCommandHandler(Context);
            _clearUserCartCommandHandler = new ClearUserCartCommandHandler(Context);
            _deleteBoxFromCartCommandHandler = new DeleteBoxFromCartCommandHandler(Context);
            _cart = new Cart()
            {
                UserId = Guid.NewGuid().ToString(),
                BoxId = Guid.NewGuid(),
                Quantity = 1
            };
        }

        [Test]
        public async Task Valid_Cart_Added()
        {
            var res = await _addBoxToCartCommandHandler.Handle(new AddBoxToCartCommand
            {
                UserId = _cart.UserId,
                BoxId = _cart.BoxId,
                Quantity = 1
            }, CancellationToken);

            var cart = Context.Carts.ToArray();

            Assert.IsTrue(res);
            Assert.AreEqual(cart.Length, 1);
        }

        [Test]
        public async Task ClearUserCart_Success()
        {
            await _addBoxToCartCommandHandler.Handle(new AddBoxToCartCommand
            {
                UserId = _cart.UserId,
                BoxId = _cart.BoxId,
                Quantity = 1
            }, CancellationToken);

            var res = await _clearUserCartCommandHandler.Handle(new ClearUserCartCommand { UserId = _cart.UserId }, CancellationToken);
            var cart = Context.Carts.ToArray();

            Assert.IsTrue(res);
            Assert.AreEqual(cart.Length, 0);
        }

        [Test]
        public async Task ClearUserCart_ThrowException()
        {
            await _addBoxToCartCommandHandler.Handle(new AddBoxToCartCommand
            {
                UserId = _cart.UserId,
                BoxId = _cart.BoxId,
                Quantity = 1
            }, CancellationToken);

            var cart = Context.Carts.ToArray();

            Assert.ThrowsAsync<GiftShopException>(async () => await _clearUserCartCommandHandler.Handle(new ClearUserCartCommand { UserId = Guid.Empty.ToString() }, CancellationToken));
            Assert.AreEqual(cart.Length, 1);
        }

        [Test]
        public async Task DeleteBoxFromCart_Success()
        {
            await _addBoxToCartCommandHandler.Handle(new AddBoxToCartCommand
            {
                UserId = _cart.UserId,
                BoxId = _cart.BoxId,
                Quantity = 1
            }, CancellationToken);

            var res = await _deleteBoxFromCartCommandHandler.Handle(new DeleteBoxFromCartCommand
            { 
                UserId = _cart.UserId,
                BoxId = _cart.BoxId

            }, CancellationToken);
            var cart = Context.Carts.ToArray();

            Assert.IsTrue(res);
            Assert.AreEqual(cart.Length, 0);
        }

        [Test]
        public async Task DeleteBoxFromCart_ThrowException()
        {
            await _addBoxToCartCommandHandler.Handle(new AddBoxToCartCommand
            {
                UserId = _cart.UserId,
                BoxId = _cart.BoxId,
                Quantity = 1
            }, CancellationToken);

            var cart = Context.Carts.ToArray();

            Assert.ThrowsAsync<GiftShopException>(async () => await _deleteBoxFromCartCommandHandler.Handle(new DeleteBoxFromCartCommand
            {
                UserId = Guid.Empty.ToString(),
                BoxId = Guid.Empty
            }, CancellationToken));
            Assert.AreEqual(cart.Length, 1);
        }
    }
}
