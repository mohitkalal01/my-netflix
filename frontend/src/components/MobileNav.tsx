import { NavLink } from 'react-router-dom';
import {
    HomeIcon,
    MagnifyingGlassIcon,
    TvIcon,
    FilmIcon,
    BookmarkIcon
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeIconSolid,
    MagnifyingGlassIcon as MagnifyingGlassIconSolid,
    TvIcon as TvIconSolid,
    FilmIcon as FilmIconSolid,
    BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid';

interface NavItemProps {
    to: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    IconActive: React.ComponentType<{ className?: string }>;
}

const NavItem = ({ to, label, Icon, IconActive }: NavItemProps) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex flex-col items-center justify-center py-2 px-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400'
            }`
        }
    >
        {({ isActive }) => (
            <>
                {isActive ? (
                    <IconActive className="h-6 w-6" />
                ) : (
                    <Icon className="h-6 w-6" />
                )}
                <span className="text-[10px] mt-1 font-medium">{label}</span>
            </>
        )}
    </NavLink>
);

const MobileNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-t border-gray-800 md:hidden safe-area-bottom">
            <div className="flex items-center justify-around">
                <NavItem
                    to="/"
                    label="Home"
                    Icon={HomeIcon}
                    IconActive={HomeIconSolid}
                />
                <NavItem
                    to="/search"
                    label="Search"
                    Icon={MagnifyingGlassIcon}
                    IconActive={MagnifyingGlassIconSolid}
                />
                <NavItem
                    to="/tv-shows"
                    label="TV Shows"
                    Icon={TvIcon}
                    IconActive={TvIconSolid}
                />
                <NavItem
                    to="/movies"
                    label="Movies"
                    Icon={FilmIcon}
                    IconActive={FilmIconSolid}
                />
                <NavItem
                    to="/my-list"
                    label="My List"
                    Icon={BookmarkIcon}
                    IconActive={BookmarkIconSolid}
                />
            </div>
        </nav>
    );
};

export default MobileNav;
