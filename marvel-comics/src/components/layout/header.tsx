import React, { useState, useEffect, useRef } from 'react';
import ComicLatestList from '../comics/comicsLatestList';
import CharactersList from '../characters/charactersList';
import { MenuItems, SubmenuItem } from '../../shared/models/menu';
import { Each } from '../../shared/utils/Each';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCharacters } from '../../shared/redux/selectors/characterSelectors';
import { selectLatestComics } from '../../shared/redux/selectors/comicsSelectors';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const characters = useSelector(selectCharacters);
  const latestComics = useSelector(selectLatestComics);

  const menuItems: MenuItems[] = [
    {
      label: "Home",
      link: '/',
    },
    {
      label: 'Comics',
      submenu: [
        { id: 'all comics', label: 'All Comics', link: '/comics' },
      ],
      comics: true,
      comicsData: latestComics,
    },
    {
      label: 'Characters',
      submenu: [
        { id: 'all character', label: 'All Characters', link: '/characters' },
      ],
      characters: true,
      charactersData: characters,
    },
    // Add more menu items as needed
  ];

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (index: number, link: string) => {
    if(link) {
      navigate(link);
    } else {
      setActiveMenu(activeMenu === index ? null : index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) { 
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header" ref={menuRef}>
      <div className="navbar">
        <div className="justify-between flex-1">
          <Link className="text-xl btn btn-ghost" to='/'>
            <img src="/images/marvel_Logo.png" alt="Logo" className="w-auto h-8" />
          </Link>
          <button type="button" title="arrow" className="block mr-4 text-gray-500 md:hidden btn btn-square btn-ghost hover:bg-gray-100" onClick={() => setOpenMenu(!openMenu)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
        <div className="flex-none hidden mx-4 md:block">
          <div className="flex items-center justify-center space-x-4">
            <Each of={menuItems} render={(menu: MenuItems, index: number) => (
              <React.Fragment key={index}>
                <div
                  key={index}
                  className="relative flex items-center gap-2 p-2 text-white cursor-pointer group hover:bg-hover hover:text-white hover:rounded-md"
                  onClick={() => toggleMenu(index, menu.link ?? '')}
                >
                  <span>{menu.label}</span>
                  {menu.submenu && (
                    <div
                      className={`w-2 h-2 bg-transparent shadow-2px-2px origin-[75%_75%] transition-transform transition-margin-top duration-300 ease-in-out ${activeMenu === index ? 'rotate-[225deg] mb-2' : 'rotate-45 mb-2'}`}
                    ></div>
                  )}
                </div>
                {menu.submenu && (
                  <div className='mt-8'>
                    <div
                      className={`absolute ${activeMenu === index ? 'block' : 'hidden'} bg-black-100 text-white z-10 mt-2 space-y-2 w-full left-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]`}
                    >
                      <div className='flex flex-wrap justify-center mx-auto my-0 '>
                        <Each of={menu.submenu} render={(submenuItem: SubmenuItem) => (
                          <Link key={submenuItem.id} to={submenuItem.link} className="block px-4 py-2 font-bold uppercase">
                            {submenuItem.label}
                          </Link>
                        )} />
                      </div>
                      {menu.comics && (
                        <>
                          <div>
                            <h1 className='flex flex-wrap justify-center pb-6 mx-auto text-3xl font-bold uppercase'>Latest Comics</h1>
                            <div className='flex flex-wrap justify-center mx-auto'>
                              <ComicLatestList latestComicData={menu.comicsData ?? []} />
                            </div>
                          </div>
                        </>
                      )}
                      {menu.characters && (
                        <>
                          <div>
                            <h1 className='flex flex-wrap justify-center pb-6 mx-auto text-3xl font-bold uppercase'>Random Characters</h1>
                            <div className='w-full'>
                              <CharactersList randomCharactersData={menu.charactersData ?? []} />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

              </React.Fragment>
            )} />
          </div>
        </div>
      </div>
      <div className={`menu-container ${openMenu ? 'open' : ''} md:hidden bg-transparent w-full absolute shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]`}>
          <div className="flex flex-col items-center">
            <Each<MenuItems> of={menuItems} render={(menu: MenuItems, index: number) => (
              <React.Fragment key={index}>
                <div
                  key={index}
                  className="relative flex items-center gap-2 p-2 text-white cursor-pointer group hover:bg-hover hover:text-black hover:rounded-md"
                >
                  <span>{menu.label}</span>
                </div>
              </React.Fragment>
            )} />
          </div>
        </div>
    </header>
  );
};

export default Header;