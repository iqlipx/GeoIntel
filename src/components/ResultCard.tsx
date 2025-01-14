import React from 'react';
import { MapPin, Clock, Globe, Wifi, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { IPData } from '../types/ip';
import { Map } from './Map';

interface ResultCardProps {
  data: IPData;
}

export function ResultCard({ data }: ResultCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {data.city}, {data.regionName}, {data.country}
              </p>
              <button
                onClick={() => window.open(`https://www.google.com/maps?q=${data.lat},${data.lon}`, '_blank')}
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 
                         dark:hover:text-blue-300 flex items-center space-x-1 mt-1"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{data.timezone}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleTimeString('en-US', { timeZone: data.timezone })}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Wifi className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ISP</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{data.isp}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{data.org || 'Organization not available'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Globe className="w-6 h-6 text-blue-500 mt-1" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Coordinates</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {data.lat}, {data.lon}
              </p>
              <button
                onClick={() => copyToClipboard(`${data.lat}, ${data.lon}`)}
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 
                         dark:hover:text-blue-300"
              >
                Copy coordinates
              </button>
            </div>
          </div>
        </div>

        <div className="h-[300px] md:h-full min-h-[300px] rounded-lg overflow-hidden">
          <Map latitude={data.lat} longitude={data.lon} />
        </div>
      </div>
    </motion.div>
  );
}