using Infrastracture.Persistence;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace UnitTests
{
    [TestFixture]
    internal class TestInitializer
    {
        protected AppDbContext Context { get; set; }
        protected CancellationToken CancellationToken = new CancellationTokenSource().Token;

        [SetUp]
        protected virtual void Initialize()
        {
            var factory = new ConnectionFactory();
            Context = factory.CreateContextForInMemory();
            TestContext.WriteLine("Initialize test data");
        }

        [TearDown]
        protected virtual void Cleanup()
        {
            TestContext.WriteLine("Cleanup test data");
        }
    }
}
