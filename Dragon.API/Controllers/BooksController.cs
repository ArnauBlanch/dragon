using Microsoft.AspNetCore.Mvc;
using Dragon.API.Mappers;
using Dragon.API.Models;
using Dragon.Application.Services.Contracts;
using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;

namespace Dragon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookAppService bookAppService;
        private readonly IBookResponseMapper bookResponseMapper;

        public BooksController(
            IBookAppService bookAppService,
            IBookResponseMapper bookResponseMapper)
        {
            this.bookAppService = bookAppService;
            this.bookResponseMapper = bookResponseMapper;
        }

        // GET api/books
        [HttpGet]
        public ActionResult<IList<Book>> GetAll()
        {
            var result = this.bookAppService.GetAll();
            return Ok(result);
        }

        // GET api/books/:isbn
        [HttpGet("{isbn}")]
        public ActionResult<BookResponse> GetByISBN(int isbn)
        {
            var book = this.bookAppService.Get(isbn);
            if (book == null)
                return NotFound();

            var result = this.bookResponseMapper.Convert(book);
            return Ok(result);
        }

        // POST api/books/:isbn/sell
        [HttpPost("{isbn}/sell")]
        public ActionResult Sell(int isbn)
        {
            var result = this.bookAppService.Sell(isbn);

            switch (result)
            {
                case OperationResult.Done:
                    return NoContent();
                case OperationResult.Invalid:
                    return BadRequest();
                default:
                    return NotFound();
            }
        }

        // DELETE api/books/:isbn/sell
        [HttpDelete("{isbn}/sell")]
        public ActionResult UndoSell(int isbn)
        {
            var result = this.bookAppService.UndoLastSell(isbn);

            switch (result)
            {
                case OperationResult.Done:
                    return NoContent();
                case OperationResult.Invalid:
                    return BadRequest();
                default:
                    return NotFound();
            }
        }
    }
}
