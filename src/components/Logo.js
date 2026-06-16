'use client';
import Image from 'next/image';

export default function Logo({ width, className }) {
    return (
        <Image
            src="/images/JTlogo.jpeg"
            alt="Jahnawi Tripathi Logo"
            width={parseInt(width) || 64}
            height={parseInt(width) || 64}
            className={className}
            style={{ objectFit: 'contain' }}
        />
    );
}