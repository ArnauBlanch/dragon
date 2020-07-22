import React from 'react';

const ExamplePage: React.FC = () => (
  <div className="flex flex-wrap items-center -mb-4 sm:max-w-4xl mx-auto sm:mt-6 select-none pb-8">
    <div className="w-full sm:w-1/3">
      <img
        className="w-5/12 sm:w-2/3 mx-auto my-8 shadow-2xl"
        alt="cover"
        src="https://images-na.ssl-images-amazon.com/images/I/71EE3HwPpjL.jpg"
      />
    </div>
    <div className="w-full sm:w-2/3 mb-4 px-6 text-center">
      <div className="text-3xl font-bold leading-tight">
        Someone Who Will Love You In All Your Damaged Glory
      </div>
      <div className="text-md mt-2 text-gray-700">Raphael Bob-Waksberg</div>
      <table className="w-full mt-8">
        <thead>
          <tr>
            <th className="text-red-500 text-sm uppercase">Price</th>
            <th className="text-red-500 text-sm uppercase">Availability</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-3xl font-thin">12,50 €</td>
            <td className="text-2xl font-thin"> 2 / 3</td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-2 space-x-4 my-6 text-lg">
        <button
          type="button"
          className="bg-red-100 text-red-500 hover:bg-red-200 focus:outline-none focus:shadow-outline focus:border-red-500 font-semibold border border-red-500 p-2 rounded-lg inline-flex items-center justify-center"
        >
          <span className="inline-block align-middle">Scan again</span>
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-400 focus:outline-none focus:shadow-outline focus:border-red-500 text-white font-semibold p-2 rounded-lg align-middle inline-flex items-center justify-center"
        >
          Record sale
        </button>
      </div>
    </div>

    <div className="text-left text-sm text-gray-700 mt-2 m-6">
      Written with all the scathing dark humor that is a hallmark of BoJack Horseman, Raphael
      Bob-Waksberg’s stories will make you laugh, weep, and shiver in uncomfortably delicious
      recognition. In “A Most Blessed and Auspicious Occasion,” a young couple engaged to be married
      is forced to deal with interfering relatives dictating the appropriate number of ritual goat
      sacrifices for their wedding. “Missed Connection—m4w” is the tragicomic tale of a pair of
      lonely commuters eternally failing to make that longed-for contact. And in “More of the You
      That You Already Are,” a struggling employee at a theme park of dead presidents finds that
      love can’t be genetically modified.
      <br />
      <br />
      Equally at home with the surreal and the painfully relatable (and both at once), Bob-Waksberg
      delivers a killer combination of humor, romance, whimsy, cultural commentary, and crushing
      emotional vulnerability.
    </div>

    <div className="m-6 mb-2 w-full">
      <div className="text-red-500 font-semibold mb-2">Sales history</div>
      <div className="flex flex-wrap">
        <div className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100">
          <div>
            24/04/20 12:23{' '}
            <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
              Beatrice
            </span>
          </div>
          <button
            type="button"
            className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
          >
            Undo
          </button>
        </div>
        <div className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100">
          <div>
            24/04/20 18:55{' '}
            <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
              Andrew
            </span>
          </div>
          <button
            type="button"
            className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
          >
            Undo
          </button>
        </div>
        <div className="w-full flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100">
          <div>
            25/04/20 09:30{' '}
            <span className="text-gray-600 font-thin text-sm ml-2 uppercase tracking-tighter">
              Shaun
            </span>
          </div>
          <button
            type="button"
            className="right-auto hover:bg-red-500 rounded-md hover:text-white text-sm py-1 px-3 font-semibold focus:outline-none border border-red-500 text-red-500 bg-red-100"
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ExamplePage;
